import { useState } from "react";

type SearchBarProps = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

const SearchBar = ({ city, setCity, onSubmit }: SearchBarProps) => {
  //const [city, setCity] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  /*const handleSubmit = () => {
    console.log(city);
    setIsSubmitted(true);
  };*/
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-2">
      <input
        type="text"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
        placeholder="Search Location..."
        className="bg-transparent text-white placeholder-white/50 outline-none flex-1 border-b"
      />
      <button onClick={onSubmit} className=" text-white cursor-pointer">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
