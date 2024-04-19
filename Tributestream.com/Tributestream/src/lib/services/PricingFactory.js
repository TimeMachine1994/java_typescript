import { SoloStrategy, AnywhereStrategy, LegacyStrategy } from "./PriceStrategy";

class PricingFactory {
    static createPricingStrategy(packageType) {
        switch (packageType) {
            case 'Solo':
                return new SoloStrategy();
            case 'Anywhere':
                return new AnywhereStrategy();
            case 'Legacy':
                return new LegacyStrategy();
            default:
                throw new Error("Unknown package type");
        }
    }
}

export default PricingFactory;
