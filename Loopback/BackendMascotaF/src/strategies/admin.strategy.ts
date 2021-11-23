import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
//import { Request } from "node-fetch";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

// Codigo para implementar la estrategia de un usuario

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string= 'admin';

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion:AutenticacionService

    ){

    }

    async authenticate(request: Request): Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if (token){
            let datos =this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos){
                //if(datos.data.role)
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombre

                });
                return perfil;
               }else {
                   throw new HttpErrors[401]("El token incluido no es valido")
                   }
                }else{
                    throw new HttpErrors[401]("No se ha incluido un token en la solicitud.")
                }
        }
        
    }
    
