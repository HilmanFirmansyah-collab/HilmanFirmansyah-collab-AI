export interface ChannelRecommendation {
  id: string;
  name: string;
  description: string;
  similarityReason: string;
  url: string;
  tags: string[];
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: ChannelRecommendation[] | null;
}