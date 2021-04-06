export class Produit {  
    
    constructor(
        public nomProduit: string,
        public nomVendeur:string,
        public contactVendeur:string,
        public genre : string,
        public photos?:string[]) {}
    ;
}