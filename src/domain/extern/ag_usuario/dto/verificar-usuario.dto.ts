export interface VerificarUsuarioPersonaDTO {
    token: string;
}

export interface VerificarUsuarioExternoDTO {
    publicKey: string;
    timestamp: number;
    signature: string;
}
