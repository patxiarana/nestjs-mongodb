import { Controller,Get,Post,Put,Delete, Res,HttpStatus,Body,Param,NotFoundException, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService) {}

    @Post('/create')
   async createPost(@Res() res, @Body() createProductDto:CreateProductDto){
  const product =  await this.productService.createProduct(createProductDto)

   return res.status(HttpStatus.OK).json({
        message: "Product created successfully",
        product 
     })
    }

    @Get('/')
   async getProducts(@Res() res) {
      const products = await this.productService.getProducts();
       return res.status(HttpStatus.OK).json({
         message: "All products",
         products 
      })
    }

    @Get('/:productID')
   async getProduct(@Res() res , @Param('productID') productID) {
      const product =  await  this.productService.getProduct(productID)
      if(!product) throw new NotFoundException('Product not found')
      return res.status(HttpStatus.OK).json(product)
   
    }

    @Delete('/delete/:productID') 
   async deleteProduct(@Res() res , @Param('productID') productID) {
        const product = await this.productService.deleteProduct(productID)
        if(!product) throw new NotFoundException('Product not found')
            return res.status(HttpStatus.OK).json(product)
    }

    @Put('/update') 
      async updateProduct(@Res() res, @Body() createProductDto : CreateProductDto , @Query('productID') productID ){
          const updateProduct =  await this.productService.updateProduct(productID, createProductDto)
          if(!updateProduct) throw new NotFoundException('Product not found')
            return res.status(HttpStatus.OK).json({
        message:'product updated successfully',
        updateProduct 
            })
      }
}
