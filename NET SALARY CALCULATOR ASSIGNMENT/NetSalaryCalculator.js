function calculateNetSalary(basicSalary, benefits) {
    // Determine gross salary
    let grossSalary = basicSalary + benefits;

    // Calculate NHIF Deductions
    let nhifDeduction = calculateNHIFDeductions(grossSalary);

    // Calculate Payee (Tax) Deductions
    let payee = calculatePayeeDeductions(basicSalary);

    // Calculate NSSF Deductions
    let nssfDeduction = calculateNSSFContribution(basicSalary);

    // Calculate Net Salary
    let netSalary = grossSalary - payee - nhifDeduction - nssfDeduction;

    // Return all calculated values
    return {
        grossSalary: grossSalary,
        payee: payee,
        nhifDeduction: nhifDeduction,
        nssfDeduction: nssfDeduction,
        netSalary: netSalary
    };
}

function calculateNHIFDeductions(grossSalary) {
    // NHIF Deduction ranges and corresponding deductions
    const nhifRanges = [
        { min: 0, max: 5999, deduction: 150 },
        { min: 6000, max: 7999, deduction: 300 },
        { min: 8000, max: 11999, deduction: 400 },
        { min: 12000, max: 14999, deduction: 500 },
        { min: 15000, max: 19999, deduction: 600 },
        { min: 20000, max: 24999, deduction: 750 },
        { min: 25000, max: 29999, deduction: 850 },
        { min: 30000, max: 34999, deduction: 900 },
        { min: 35000, max: 39999, deduction: 950 },
        { min: 40000, max: 44999, deduction: 1000 },
        { min: 45000, max: 49999, deduction: 1100 },
        { min: 50000, max: 59999, deduction: 1200 },
        { min: 60000, max: 69999, deduction: 1300 },
        { min: 70000, max: 79999, deduction: 1400 },
        { min: 80000, max: 89999, deduction: 1500 },
        { min: 90000, max: 99999, deduction: 1600 },
        { min: 100000, max: Infinity, deduction: 1700 }
    ];

    // Find the appropriate range for the given gross salary
    let nhifDeduction = 0;
    for (let i = 0; i < nhifRanges.length; i++) {
        if (grossSalary >= nhifRanges[i].min && grossSalary <= nhifRanges[i].max) {
            nhifDeduction = nhifRanges[i].deduction;
            break;
        }
    }

    return nhifDeduction;
}

function calculatePayeeDeductions(basicSalary) {
    // Individual tax deduction based on salary ranges
    let payee = 0;
    if (basicSalary <= 24000) {
        payee = basicSalary * 0.1; // 10% tax
    } else if (basicSalary > 24000 && basicSalary <= 32333) {
        payee = basicSalary * 0.25; // 25% tax
    } else if (basicSalary > 32333 && basicSalary <= 500000) {
        payee = basicSalary * 0.3; // 30% tax
    } else if (basicSalary > 500000 && basicSalary <= 800000) {
        payee = basicSalary * 0.325; // 32.5% tax
    } else if (basicSalary > 800000) {
        payee = basicSalary * 0.35; // 35% tax
    }

    return payee;
}

function calculateNSSFContribution(basicSalary) {
    // NSSF Deduction based on pensionable pay
    let nssfTier1Limit = 7000;
    let nssfTier2Limit = 36000;

    let nssfTier1 = Math.min(basicSalary, nssfTier1Limit) * 0.06;
    let nssfTier2 = 0;
    if (basicSalary > nssfTier1Limit) {
        nssfTier2 = Math.min(basicSalary - nssfTier1Limit, nssfTier2Limit - nssfTier1Limit) * 0.06;
    }

    return nssfTier1 + nssfTier2;
}

// Example usage:
let basicSalary = 50000; // Example basic salary
let benefits = 10000; // Example benefits
let salaryDetails = calculateNetSalary(basicSalary, benefits);

console.log("Gross Salary:", salaryDetails.grossSalary);
console.log("Payee (Tax):", salaryDetails.payee);
console.log("NHIF Deduction:", salaryDetails.nhifDeduction);
console.log("NSSF Deduction:", salaryDetails.nssfDeduction);
console.log("Net Salary:", salaryDetails.netSalary);