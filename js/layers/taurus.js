addLayer("Tau", {
    name: "Taurus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='./constellations/taurus.png'>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(10),
        }
    },
    requires: new Decimal(1000),
    color: "#ff8800",
    resource: "Taurus points", // Name of prestige currency
    baseResource: "Aries points", // Name of resource prestige is based on
    baseAmount() {/*console.log(player['Ari'].points.mag);*/ return player['Ari'].points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resetttingLayer) {
        if(resetttingLayer == 'Tau'){
            let keep = [];
            if(hasUpgrade(this.layer, '11')){
                keep.push('upgrades[0]');
            }
            layerDataReset('Ari', keep);
        }
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "t", description: "t: Reset for Taurus", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasMilestone('Ari', 1) },
    unlocked() { return hasMilestone('Ari', 1) },
    upgrades: {
        // TODO: Fix autobuy aupgrade Ari-11
        11: {
            title: 'A new Beginning',
            description: 'Get Aries upgrade 11 automagically',
            cost: new Decimal(1)
        },
    },
})
