//import { StringLocale } from "yup/lib/locale";

export interface CategoriesModel {
  //General for all category
  id: string;
  category_name: string;
}

export interface EducationalLevelsModel {
  //General for all category
  id: string;
  educational_level: string;
  educational_level_value: string;
}

export interface SubCategoriesModel {
  id: string;
  category_id: string;
  //sub_category_reference_id:string;
  sub_category_name: string;
  //educational_level_id:string;
  //educational_level_value:string;
}

export interface CatToLevelAssignmentsModel {
  id: string;
  educational_level_id: string;
  assignment_reference_id: string;
}
export interface CatToLevelAssignmentsRefModel {
  ref_id: string;
  id: string;
  ex_assignment_reference_id: string;
  ex_educational_level_id: string;
  sub_category_id: string; //The field for the SubCategory
}

export interface CombineCatWithSubCategoryModel {
  id: string;
  sub_category_id: string;
  category_id: string;
  sub_categories: string;
}

export interface EduCatSubcatViewsModel {
  educational_level_id: string;
  category_id: string;
  sub_category_id: string;
  ed_cat_sub_views: string;
}

export interface SubCategoriesRefModel {
  id: string;
  ex_sub_category_reference_id: string;
  ex_category_id: string;
  sub_category_name: string;
}

export interface CentresModel {
  id: string;
  centre_name: string;
}

export interface CriteriaModel {
  id: string;
  sub_category_id: string;
  //criteria_type:string;
  criteria_id: string;
  criteria_name: string;
  criteria_value: string;
}

export interface SubjectsModel {
  id: string;
  educational_level_id: string;
  subject_name: string;
  subject_type: string;
}

// export interface CatToLevelAssignmentsModel {
//     id:string;
//     educational_level_id:string;
//     assignment_reference_id:string;
// }
// export interface CatToLevelAssignmentsRefModel {
//     ref_id:string
//     id:string;
//     ex_assignment_reference_id:string;
//     ex_educational_level_id:string;
//     sub_category_id:string;//The field for the SubCategory
// }

export interface GradesModel {
  id: string;
  educational_level_id: string;
  //subject_id:string;
  grade_name: string;
  grade_value: number;
  grade_type: string;
}

export interface GradeAlgorithmsModel {
  id: string;
  educational_level_id: string;
  sub_category_id: string;
  subject_id: string;
  standard: string;
  grade_value: string;
  grade_type: string;

  educational_level: string;
  subject: string;
  grade: string;
  real_sub_cat_id: string;
  ed_cat_sub_views: string;
}

export interface EducationalInformationModel {
  ref_id: string;
  id: string; //autogenerate unique
  candidate_id: string;
  candidate_edu_cycle_ref: string; //autoref To users cycles_id
  educational_level_id: string;
  institution_name: string;
  program_of_study: string;
  certificate_number: string;
  year_of_completion: string;
  subject_id: string;
  grade_id: string;
  cycle_id: string;
}

export interface RequirementModel {
  id: string;
  requirement_text: string;
  description: string;
}

export interface ConstrainModel {
  id: string;
  constrain_text: string;
  description: string;
}

//https://www.storyblok.com/tp/react-dynamic-component-from-json
export interface CriteriaAlgorithmsModel {
  id: string;
  criteria_id: string;
  algorithm_reference_id: string;
}

export interface AlgorithmsRefModel {
  id: string;
  ex_algorithm_reference_id: string;
  ex_criteria_id: string;
  sub_category_id: string; //The field for the criteria
  standard: string; //lesser,greater,equal,between
  req_value: string; //Put Unit in a Bracket ie 2(m)
  req_constrains: string; //text, number, date[23-05-2020] ,select[{"id":"One"},{"id":"Two"},{"id":"Three"},{"id":"Fouth"}]
  gender_type: string; // Male/Female/All
}

// export interface ApplicantStatusModel{//ApplicantCriteriaMatcherModel
//     id:string;
//     applicant_id:string;
//     criteria_algorithm_id:string;
//     requirement:string;//combination of CriteriaAlgorithmModel Standard+Value
//     provided:string;
//     current_status:string;
// }

export interface ApplicantCriteriaMatcherModel {
  id: string;
  applicant_id: string;
  algo_ref_id: string;
  algo_type: string;
  applicant_provision: string;
  match_status: string;
}

//Create Applicant Grade Requirement Matcher Model

export interface InternalVoucherModel {
  id: string;
  serial_number: string;
  voucher_pin: string;
  voucher_reference: string;
  voucher_status: string;
  generation_true_time: string;
  stock_status: string;
  sold_by: string;
  sold_time: string;
}
export interface ExternalVoucherModel {
  id: string;
  serial_number: string;
  voucher_pin: string;
  voucher_reference: string;
  voucher_status: string;
  generation_true_time: string;
  stock_status: string;
  sold_by: string;
  sold_time: string;
}
export interface InternalPinsStatsModel {
  total_pin: string;
  unused_pin: string;
  used_pin: string;
}
export interface ExternalPinsStatsModel {
  total_pin: string;
  unused_pin: string;
  used_pin: string;
}
export interface BanksModel {
  id: string;
  bank_name: string;
}
export interface BankUsersModel {
  id: string;
  bank_user_id: string;
  bank_id: string;
}
export interface InstitutionsModel {
  id: string;
  institution_region: string;
  institution_name: string;
  institution_type: string;
}

export interface InstitutionFilesCategoriesModel {
  //InstitutionFilesCategoriesModel          InstitutionCoursesModel
  //GET_INSTITUTION_FILES_CATEGORIES       GET_INSTITUTION_FILES_CATEGORIES
  //institutionFilesCategoriesData        institutionFilesCategoriesData
  //InstitutionFilesCategoriesAction       InstitutionFilesCategoriesAction
  id: string;
  file_category_name: string;
  description: string;
}

export interface InstitutionFilesModel {
  id: string;
  institution_id: string;
  file_category_id: string;
  file_title: string;
  file_desc: string;
  file_name: string;
}
