let calculateTax = (slab, salary) => {
    let data = {};
    let slabDetails = [];
    let totalTax = 0;
    slab.tax_brackets.every(element => {
        let detail = {}
        let sal = salary;
        if (element.max && (element.max - sal) < 0) {
            detail = Object.assign({}, element);
            detail.displayMax = element.max;
            sal = sal - element.max;
        } else {
            detail.min = element.min;
            detail.displayMax = element.max;
            detail.max = salary;
            detail.rate = element.rate;
            sal = sal - element.max;
        }
        detail.salary = detail.max - detail.min
        detail.tax = detail.salary * detail.rate
        totalTax = totalTax + detail.tax;
        slabDetails.push(detail);
        if (detail.max === salary) {
            return false;
        } else {
            return true;
        }
    });
    data.slabDetails = slabDetails;
    data.totalTax = totalTax;
    data.avgTax = isNaN(totalTax / salary)? 0: totalTax / salary ;
    data.totalSalary = salary;
    return data;
}

export default calculateTax;