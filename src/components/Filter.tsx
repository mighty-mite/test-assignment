import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { filterCards, updateFilter } from "../store/cardsSlice";

interface FilterProps {
  changePage: () => void;
}

export default function Filter(props: FilterProps) {
  const { changePage } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { filter } = useSelector((state: RootState) => state.cards);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changePage();
    dispatch(updateFilter(event.target.value));
    dispatch(filterCards(event.target.value));
  };
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="filter"
        value={filter}
        name="filter-group"
        onChange={handleFilterChange}>
        <FormControlLabel value="all" control={<Radio />} label="All Cards" />
        <FormControlLabel value="liked" control={<Radio />} label="Liked" />
      </RadioGroup>
    </FormControl>
  );
}
