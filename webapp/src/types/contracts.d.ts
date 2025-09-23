declare module '@contracts' {
  export * from '../../../contracts/src/index';
}

declare module '@contracts/prescriptions' {
  export * from '../../../contracts/src/prescriptions';
  export type PrescriptionItem = import('../../../contracts/src/prescriptions').PrescriptionItem;
  export type PrescriptionRecord =
    import('../../../contracts/src/prescriptions').PrescriptionRecord;
  export type PrescriptionCreateInput =
    import('../../../contracts/src/prescriptions').PrescriptionCreateInput;
}

declare module '@contracts/patients' {
  export * from '../../../contracts/src/patients';
  export type PatientRecord = import('../../../contracts/src/patients').PatientRecord;
}

declare module '@contracts/encounters' {
  export * from '../../../contracts/src/encounters';
}

declare module '@contracts/notes' {
  export * from '../../../contracts/src/notes';
  export type NoteRecord = import('../../../contracts/src/notes').NoteRecord;
}
