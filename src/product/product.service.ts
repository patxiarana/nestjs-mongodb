import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';
@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getProducts() : Promise<Product[]> { 
     const products =  await this.productModel.find()
      return products; 
    }

   async getProduct(productID:string) : Promise<Product> { {
         const product = await this.productModel.findById(productID)
         return product;
    } }

   async createProduct(createProductDto: CreateProductDto) : Promise<Product> {
        const product =  new this.productModel(createProductDto)
       return await product.save(); 
        
    }

    async deleteProduct(productID: string) : Promise<Product> { 
       const deleteProduct = await this.productModel.findByIdAndDelete(productID)
          return deleteProduct;
    }

    updateProduct(productID:string , createProductDto: CreateProductDto) {

    }


}
