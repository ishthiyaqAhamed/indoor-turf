import { NextResponse } from 'next/server';

const FALLBACK_REVIEWS = [
  {
    author_name: "Tariq Ahamed",
    rating: 5,
    text: "The pitch quality is unmatched. Playing here feels like playing in a professional European stadium.",
    time: 1696251200,
  },
  {
    author_name: "Rahul S.",
    rating: 5,
    text: "We host all our corporate leagues here. The amenities are fantastic and the staff is super professional.",
    time: 1696251300,
  },
  {
    author_name: "Zayn M.",
    rating: 5,
    text: "The new bowling machine is a game changer for cricket practice. Highly recommend to any serious player.",
    time: 1696251400,
  }
];

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.log("Using fallback reviews: Google Places API Key or Place ID is missing.");
    return NextResponse.json({ reviews: FALLBACK_REVIEWS });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );
    const data = await response.json();

    if (data.result && data.result.reviews) {
      // Return only 5 star reviews, and max 3 to fit the UI
      const formattedReviews = data.result.reviews
        .filter((r: any) => r.rating >= 4)
        .slice(0, 3)
        .map((r: any) => ({
          author_name: r.author_name,
          rating: r.rating,
          text: r.text,
          time: r.time,
        }));
      
      return NextResponse.json({ reviews: formattedReviews });
    }

    return NextResponse.json({ reviews: FALLBACK_REVIEWS });
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json({ reviews: FALLBACK_REVIEWS });
  }
}
