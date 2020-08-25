import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {MongooseModule} from "@nestjs/mongoose";

import { UserModule } from './user/user.module';
import {configModule} from "./configure.root";
import {getUserFromCache} from "./user/cache/user.cache";

@Module({
  imports: [
      UserModule,
      configModule,

      MongooseModule.forRoot(
          process.env.MONGO_WRITE_CONNECTION_STRING,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }
      ),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(getUserFromCache).forRoutes('user/:id');
    }
}
