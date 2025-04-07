export interface LoginQuestion {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: "radio" | "checkbox";
  name: string;
  options: {
    label: string;
    value: number;
    icon: string;
  }[];
}

