import { Controller,Get,Post,Put,Delete, Res,HttpStatus,Body } from '@nestjs/common';
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
        product : product 
     })
    }

}
