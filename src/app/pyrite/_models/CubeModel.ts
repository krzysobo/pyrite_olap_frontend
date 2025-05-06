export class CubeModel {
    public name: string|null
    public label: string|null
    public description: string|null
    public category: string|null
  
    constructor(name: string|null, label: string|null, description: string|null, category: string|null) {
      this.name = name;
      this.label = label;
      this.description = description;
      this.category = category;
    }

    get empty() {
      return CubeModel.isEmpty(this);
    }
    
    public to_string(): string {
      return JSON.stringify(this);
    }
    
    public static from_string(obj_str: string): CubeModel|null {
      try{
        const obj = JSON.parse(obj_str);
        return obj;
      } catch (SyntaxError) {
        return null;
      }
    }
    
    protected static isEmpty(obj: any) {
      return (((obj.name == undefined) || (obj.name == null) || (obj.name == "")) &&
          ((obj.label == undefined) || (obj.label == null) || (obj.label == "")) &&
          ((obj.description == undefined) || (obj.description == null) || (obj.description == "")) &&
          ((obj.category == undefined) || (obj.category == null) || (obj.category == "")));

    }

    public static from_object(obj: any): CubeModel|null {
      if (CubeModel.isEmpty(obj)) {
        return null;
      }

      return new CubeModel(obj.name, obj.label, obj.description, obj.category);
    }

  }