interface IField {
  field: string;
}
interface ISubField {
  subField: string;
}
interface IIndex {
  index: number;
}
interface ISubIndex {
  subindex: number;
}
interface IThirdIndex {
  thirdindex: number;
}
interface IValue {
  value: unknown;
}

export interface ISimpleHandlerPayload extends IField, IValue { }
export interface ISimpleArrayPayload extends IField, IValue, IIndex { }
export interface IAddArrayPayload extends IField { }
export interface IRemoveArrayPayload extends IIndex { }

export interface ISecondHandlerPayload extends IField, IValue, ISubField { }
export interface ISecondTextPayload extends IField, IValue, IIndex, ISubField { }
export interface ISecondArrayPayload extends IField, IValue, IIndex, ISubIndex { }
export interface IAddSecondArrayPayload extends IField, IIndex { }

export interface IAddThirdArrayPayload extends ISubIndex, IIndex { }
export interface IThirdHandlerPayload extends ISubIndex, IIndex, IValue, IField, ISubField { }
export interface IThirdArrayPayload extends IField, IValue, IIndex, ISubIndex, IThirdIndex { }

export interface ISimpleBody {
  rut: string;
  period: number;
}
