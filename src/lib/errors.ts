export class CMError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CMError';
  }
}

export class ContractError extends CMError {
  constructor(message: string, public contractName?: string) {
    super(`ContractError: ${message}`);
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends CMError {
  constructor(message: string, public details?: any) {
    super(`ValidationError: ${message}`);
  }
}

export enum ErrorCode {
  AccessControlUnauthorizedAccount = 'AccessControlUnauthorizedAccount',
  ERC20InsufficientBalance = 'ERC20InsufficientBalance',
  ERC20InvalidSender = 'ERC20InvalidSender',
  ERC20InvalidReceiver = 'ERC20InvalidReceiver',
  ERC20InsufficientAllowance = 'ERC20InsufficientAllowance',
  ERC20InvalidApprover = 'ERC20InvalidApprover',
  ERC20InvalidSpender = 'ERC20InvalidSpender',
  PositionDoesNotExist = 'PositionDoesNotExist',
  PositionNotActive = 'PositionNotActive',
  InvalidAmount = 'InvalidAmount',
  ReservationNotPending = 'ReservationNotPending',
  ReservationExpired = 'ReservationExpired',
  NotReservationOwner = 'NotReservationOwner',
  ReservationIdMismatch = 'ReservationIdMismatch',
  InvalidBitcoinAddress = 'InvalidBitcoinAddress',
  TokenTransferFailed = 'TokenTransferFailed',

}

export const parseContractError = (error: any): string => {
  const message = error?.message || '';
  const knownErrors: Record<string, string> = {
    [ErrorCode.PositionDoesNotExist] : 'La posición no existe. Verifica el ID.',
    [ErrorCode.PositionNotActive]: 'La posición no está activa.',
    [ErrorCode.InvalidAmount]: 'El monto ingresado no es válido.',
    [ErrorCode.ReservationNotPending]: 'La reserva no está en estado pendiente.',
    [ErrorCode.ReservationExpired]: 'La reserva ha expirado.',
    [ErrorCode.NotReservationOwner]: 'No sos el dueño de esta reserva.',
    [ErrorCode.ReservationIdMismatch]: 'El ID de la reserva no coincide.',
    [ErrorCode.InvalidBitcoinAddress]: 'La dirección de Bitcoin no es válida.',
    [ErrorCode.TokenTransferFailed]: 'No se pudo transferir el token.',
  };

  for (const [key, userMessage] of Object.entries(knownErrors)) {
    if (message.includes(key)) return userMessage;
  }

  return error?.shortMessage || message || 'Error inesperado al interactuar con el contrato';
};