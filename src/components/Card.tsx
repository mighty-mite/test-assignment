import { Card as MUICard, Typography, Checkbox, Button } from "@mui/material";
import {
  DeleteOutlineOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { updateLiked, removeCard } from "../store/cardsSlice";

interface CardProps {
  title: string;
  description: string;
  id: number;
}

export default function Card(props: CardProps) {
  const { title, description, id } = props;
  const dispatch = useDispatch<AppDispatch>();

  const isLiked = useSelector((state: RootState) => {
    const liked = state.cards.liked.find((card) => card.id === id);
    return liked ? true : false;
  });

  const onRemove = (id: number) => {
    dispatch(removeCard(id));
  };

  const onLike = (id: number) => {
    dispatch(updateLiked(id));
  };
  return (
    <>
      <MUICard key={id}>
        <Typography gutterBottom variant="h5" component="div">
          {title.substring(0, 15) + "..."}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description.substring(0, 70) + "..."}
        </Typography>
        <Checkbox
          onChange={() => onLike(id)}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isLiked}
        />
        <Button
          onClick={() => onRemove(id)}
          color="error"
          children={<DeleteOutlineOutlined />}
        />
      </MUICard>
    </>
  );
}
