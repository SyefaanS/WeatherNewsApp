import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, FlatList } from "react-native";
import { fetchNewsRequest } from "../features/news/newsSlice";
import { RootState } from "../store";
import {
  ScreenContainer,
  NewsItemContainer,
  NewsTitle,
  NewsDescription,
  LoadingContainer,
} from "../theme/styledComponents";

const NewsScreen = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNewsRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#3498db" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <NewsTitle>Error: {error}</NewsTitle>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <NewsItemContainer>
            <NewsTitle>{item.title}</NewsTitle>
            <NewsDescription>{item.description || 'N/A'}</NewsDescription>
          </NewsItemContainer>
        )}
        keyExtractor={(item) => item.url}
      />
    </ScreenContainer>
  );
};

export default NewsScreen;
