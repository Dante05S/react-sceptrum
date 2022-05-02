import axios from "axios";
import cookie from "js-cookie";

export default class BranchOfficeService {
  static endpoint = "branch-offices";
  static categories = "categories-with-products";
  static cityId = "c1e4bcc9-eb84-4653-872c-e38f8de4bf79";
  static lat = "4.545367057195659";
  static lng = "-76.09435558319092";
  static API_URI =
    "https://us-central1-adomi-dev.cloudfunctions.net/core/api/v1";

  static async getAll() {
    this.endpoint = "branch-offices";
    this.endpoint = `${this.endpoint}?city_id=${this.cityId}&lat=${this.lat}&lng=${this.lng}&coverage_radio=true`;
    try {
      const response = await axios.get(`${this.API_URI}/${this.endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.message);
      return error?.response?.data;
    }
  }

  static async getById(id) {
    this.endpoint = "branch-offices";
    this.endpoint = `${this.endpoint}/${id}?slim=false&schedule=false&city_id=${this.cityId}&lat=${this.lat}&lng=${this.lng}`;
    try {
      const response = await axios.get(`${this.API_URI}/${this.endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error.message);
      return error?.response?.data;
    }
  }

  static async getAllCategoriesById(id) {
    this.endpoint = "branch-offices";
    this.endpoint = `${this.endpoint}/${id}/${this.categories}`;
    try {
      const response = await axios.get(`${this.API_URI}/${this.endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error.message);
      return error?.response?.data;
    }
  }
}
