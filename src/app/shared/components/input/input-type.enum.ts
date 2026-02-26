export enum InputTypeEnum {
  BUTTON = "button",
  VALUE = "value",
  CHECKBOX = "checkbox",
  COLOR = "color",
  DATE = "date",
  DATETIME_LOCAL = "datetime-local",
  EMAIL = "email",
  FILE = "file",
  ACCEPT = "accept",
  HIDDEN = "hidden",
  IMAGE = "image",
  ALT = "alt",
  SRC = "src",
  MONTH = "month",
  NUMBER = "number",
  PASSWORD = "password",
  RADIO = "radio",
  NAME = "name",
  RANGE = "range",
  MIN = "min",
  MAX = "max",
  RESET = "reset",
  SEARCH = "search",
  SUBMIT = "submit",
  TEL = "tel",
  TEXT = "text",
  TIME = "time",
  URL = "url",
  WEEK = "week"
}

export type InputType =
  `${InputTypeEnum}`;
