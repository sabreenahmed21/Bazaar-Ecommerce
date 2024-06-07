class apiFeatures {
  constructor(query, queryString) {
    this.queryString = queryString;
    this.query = query;
  }

  // search() {
  //   const keyword = this.queryString.keyword
  //     ? {
  //         title: { $regex: this.queryString.keyword, $options: "i" },
  //       }
  //     : {};
  //   this.query = this.query.find({ ...keyword });
  //   return this;
  // }

  // search() {
  //   if (this.queryString.keyword) {
  //     const lang = this.queryString.lang || "en";
  //     const field = `title.${lang}`;
  //     const keyword = {
  //       [field]: { $regex: this.queryString.keyword, $options: "i" },
  //     };
  //     this.query = this.query.find(keyword);
  //   }
  //   return this;
  // }

  search() {
    if (this.queryString.keyword) {
      const fields = ["title.en", "title.ar"]; 
      const keyword = {
        $or: fields.map(field => ({
          [field]: { $regex: this.queryString.keyword, $options: "i" }
        }))
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword", "lang"];
    excludedFields.forEach((field) => delete queryObj[field]);
  
    // Advanced filtering for MongoDB operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    // Initialize the composite query object
    const mongoQuery = JSON.parse(queryStr);
  
    // Handle sizes, if provided
    if (queryObj.sizes) {
      const sizesArray = queryObj.sizes.split(",");
      mongoQuery.sizes = { $in: sizesArray };
    }
  
    // Handle brands, if provided
    if (queryObj.brand) {
      const brandArray = queryObj.brand.split(",");
      mongoQuery.brand = { $in: brandArray };
    }
  
    this.query = this.query.find(mongoQuery);
  
    return this;
  }
  

  paginate(resultPerPage) {
    const page = this.queryString.page || 1;
    const skip = (page - 1) * resultPerPage;
    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
}

export default apiFeatures;
