export class Produit {   
    photo : string;
    detail : string;
    constructor(
        public nomProduit: string,
        public nomVendeur:string,
        public contactVendeur:string,
    ){}
}