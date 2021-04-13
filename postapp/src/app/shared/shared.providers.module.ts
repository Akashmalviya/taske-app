import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { ApiHandlerService } from "./services/api-handler.service";
import { StorageAccessorService } from "./services/localstorage-accessor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { adminGuardService, islogin, UserGuardService } from "./services/auth.guard.service";
import { CustomeValidationService } from "./services/custom-validation.service";
import { JwtInterceptor } from "./services/jwt.interceptor";
import { ErrorInterceptor } from "./services/error.interceptor";

@NgModule({})
export class SharedProvidersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedProvidersModule,
      providers: [
        CustomeValidationService,
        UserGuardService,adminGuardService,islogin,
        ApiHandlerService,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
        StorageAccessorService,
      ],
    };
  }
}
