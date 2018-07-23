export class CompanyClass {
    constructor(company) {
        const { shareIntervals } = company
        this.name = company.name

        // capital
        this.capital = 0
        for(const intvl of shareIntervals) {
            this.capital += (intvl.end - intvl.start +1)*intvl.attr.valueInEur
        }

        // shares
        this.shares = 0
        for(const intvl of shareIntervals) {
            this.shares += (intvl.end - intvl.start +1)
        }

    }
}
