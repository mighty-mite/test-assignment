import { fetchCards } from "../store/cardsSlice";
import { Button, Card, Checkbox, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store/store";
import { useEffect } from "react";
import { ICard } from "../utils/types";
import {
  DeleteOutlineOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cards } = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    dispatch(fetchCards());
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards, dispatch]);

  const renderCards = (arr: ICard[]) => {
    return arr.map((card) => {
      return (
        <Card key={card.id}>
          <Typography gutterBottom variant="h5" component="div">
            {card.title.substring(0, 15) + "..."}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {card.description.substring(0, 70) + "..."}
          </Typography>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          <Button color="error" children={<DeleteOutlineOutlined />} />
        </Card>
      );
    });
  };

  const content = renderCards(cards);

  return (
    <section className="main">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "15px",
        }}>
        {content}
      </div>
    </section>
  );
}
