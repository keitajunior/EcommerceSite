export class Produit {
    public detail: string;
    constructor(
        public nomProduit: string,
        public nomVendeur:string,
        public contactVendeur:string,
        public photos: string[],
    ){}
}