addLayer("Ari", {
    name: "Aries", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='./constellations/aries.png'>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ff8800",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Aries points", // Name of prestige currency
    baseResource: "stars", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade(this.layer, '14')) mult = mult.times(upgradeEffect(this.layer, '14'));
        if(hasUpgrade(this.layer, '22')) mult = mult.times(3);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        return hasUpgrade(this.layer, 24) ? 0.5 : 0;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "A: Reset for Aries", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    branches: ['Tau'],
    layerShown() { return true },
    upgrades: {
        11: {
            title: "Start Somewhere",
            description: "Start Generating 1 star/s",
            cost: new Decimal(1)
        },
        12: {
            title: 'Get more stars',
            description: 'Get +1  star/s',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade(this.layer, 11) }
        },
        13: {
            title: 'Getting serious',
            description: 'Gain more stars based on Aries',
            cost: new Decimal(2),
            tooltip: "(Aries + 1)^0.5",
            unlocked() { return hasUpgrade(this.layer, 12) },
            effect() { return player[this.layer].points.add(1).pow(0.5) },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' }
        },
        14: {
            title: 'Reverse upgrade',
            description: 'Gain more Aries based on Stars',
            cost: new Decimal(5),
            tooltip: 'log2(sqrt(stars))',
            unlocked(){return hasUpgrade(this.layer, 13)},
            effect() {return player.points.sqrt().sqrt().log2()>=1 ? player.points.sqrt().sqrt().log2() : 1},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + 'x'}
        },
        21: {
            title: 'A new age',
            description: 'Stars boost themselves',
            cost: new Decimal(15),
            tooltip: 'log10(stars^8)',
            unlocked() {return hasMilestone(this.layer, 0)},
            effect() {return player.points.pow(8).log10() >=1 ? player.points.pow(8).log10() : 1},
            effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + 'x'}
        },
        22: {
            title: 'Inflation era',
            description: 'Half star production but triple Aries gain',
            cost: new Decimal(55),
            tooltip: 'Stars /2 Aries *3',
            unlocked() {return hasUpgrade(this.layer, '21')},
            effect() {return 2},
        },
        23: {
            title: 'Turning Back',
            description: 'Slow progress a bit',
            cost: new Decimal(150),
            tooltip: 'sqrt(stars)',
            unlocked() {return hasUpgrade(this.layer, '22')},
        },
        24: {
            title: 'Going idle',
            description: 'Gain 50% of Aries you vould get on reset per second',
            cost: new Decimal(75),
            unlocked() {return hasUpgrade(this.layer, 23) && player[this.layer].points.gte(50)}
        }
    },
    milestones: {
        0: {
            requirementDescription: "Get 10 Aries",
            effectDescription: 'Unlock more Aries upgrades',
            done() {return player[this.layer].best.gte(10)},
            unlocked() {return hasUpgrade(this.layer, '14')},
        },
        1: {
            requirementDescription: "Get 500 Aries",
            effectDescription: "Unlock the next consellation",
            done() {return player[this.layer].best.gte(500)},
            unlocked() {return hasUpgrade(this.layer, 24)}
        }
    }
})