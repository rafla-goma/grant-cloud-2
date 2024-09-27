export interface SubsidyInfo {
    id: string;
    name: string;
    title: string;
    target_area_search: string;
    subsidy_max_limit: number;
    acceptance_start_datetime: string;
    acceptance_end_datetime: string;
    target_number_of_employees: string;
    subsidy_name?: string;
    purpose?: string;
    target_industry?: string;
    target_area?: string;
  }

  export interface ApplicationGuideline {
    name: string;
    data: string;
  }

  export interface ApplicationForm {
    name: string;
    data: string;
  }
  
export interface SubsidyDetail {
  id: string;
  name: string;
  title: string;
  acceptance_start_datetime: string;
  acceptance_end_datetime: string;
  project_end_deadline: string;
  request_reception_presence: string;
  subsidy_catch_phrase: string;
  subsidy_max_limit: number;
  is_enable_multiple_request: boolean;
  subsidy_rate: string;
  target_area_detail: string | null;
  target_area_search: string;
  target_number_of_employees: string;
  detail: string;
  use_purpose: string | string[]; // APIでは文字列ですが、複数の目的がある場合に備えて配列も許容
  industry: string;
  front_subsidy_detail_page_url: string;
  application_guidelines: ApplicationGuideline[];
  outline_of_grant: ApplicationGuideline[];
  application_form: ApplicationForm[];
}
