import { Select } from "antd";
import countryList from "../model/countryList";

const { Option } = Select;

interface NavbarProps {
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSearchKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  search,
  onSearchChange,
  onCountryChange,
  onCategoryChange,
  onSearchKeyPress,
}) => {
  const handleCountryChange = (value: string) => {
    onCountryChange(value);
  };

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
  };

  return (
    <div className="bg-white p-4 shadow-lg flex justify-between items-center">
      <div className="text-2xl font-bold hidden lg:block text-black">
        Eigen News
      </div>
      <div className="flex items-center">
        <Select
          defaultValue="us"
          style={{ width: 120, marginRight: 10 }}
          onChange={handleCountryChange}
        >
          {countryList.map((country) => (
            <Option key={country.id} value={country.id}>
              {country.flag} {country.country}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue="general"
          style={{ width: 120, marginRight: 10 }}
          onChange={handleCategoryChange}
        >
          <Option value="general">General</Option>
          <Option value="business">Business</Option>
          <Option value="entertainment">Entertainment</Option>
          <Option value="health">Health</Option>
          <Option value="science">Science</Option>
          <Option value="sports">Sports</Option>
          <Option value="technology">Technology</Option>
        </Select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
          onKeyPress={onSearchKeyPress}
          className="border rounded-md p-2"
        />
      </div>
    </div>
  );
};

export default Navbar;
