import axios, {AxiosError} from 'axios';
import {
  GoogleAddressAutocompleteResult,
  PlaceDetailResponse,
  ReverseGeocodingResponse,
  LatLng,
} from '../components/Address.types';
import {debounce} from '../utils/util';
import BaseConfig from '../config';
import {i18n} from '../i18n';
import polyline from '@mapbox/polyline';
import {LatLng as LatLngMaps} from 'react-native-maps';

type Response = GoogleAddressAutocompleteResult;

export const search = async (keywords: string) => {
  if (keywords === '') {
    return Promise.resolve([]);
  }
  try {
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keywords}&key=${BaseConfig.GOOGLE_API_KEY}&language=${i18n.locale}`;
    const response = await axios.get(endpoint, {
      headers: {Accept: 'application/json'},
    });
    console.log('🚀 ~ search ~ response:', response);
    const data = response.data as Response;

    if (data.status === 'OK') {
      return data.predictions;
    } else {
      return [];
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw Error(axiosError.message);
  }
};

export const debouncedSearch = debounce(search, 1000);

export const reverseGeocoding = async (location: LatLng) => {
  try {
    console.log('----asd-as-d-asd-asd-a-sd-asd-asd-');
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${BaseConfig.GOOGLE_API_KEY}`;

    const response = await axios.get(endpoint, {
      headers: {Accept: 'application/json'},
    });
    const data = response.data as ReverseGeocodingResponse;

    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0];
    } else {
      throw Error('No result(s)');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.log('Error getting location:', error);
    throw Error(axiosError.message);
  }
};

export const getPlaceDetails = async (placeId: string) => {
  try {
    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_address,geometry&placeid=${placeId}&key=${BaseConfig.GOOGLE_API_KEY}`;
    const response = await axios.get(endpoint, {
      headers: {Accept: 'application/json'},
    });
    const data = response.data as PlaceDetailResponse;

    if (data.status === 'OK') {
      return data.result;
    } else {
      throw Error('No result(s)');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error getting location:', error);
    throw Error(axiosError.message);
  }
};

export interface DistanceResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: {elements: Element[]}[];
  status: string;
}

export interface Element {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

export const getDistance = async (origin: LatLng, destination: LatLng) => {
  try {
    const endpoint = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${origin.lat},${origin.lng}&origins=${destination.lat},${destination.lng}&units=km&key=${BaseConfig.GOOGLE_API_KEY}`;
    console.log('endpoint', endpoint);
    const response = await axios.get(endpoint, {
      headers: {Accept: 'application/json'},
    });
    const data = response.data as DistanceResponse;

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      return data.rows[0].elements[0];
    } else {
      throw Error('No result(s)');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error getting distance:', error);
    throw Error(axiosError.message);
  }
};

export interface RouteResponse {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };

  polyline: LatLngMaps;
}
export const getRoute = async (
  origin: LatLng,
  destination: LatLng,
): Promise<RouteResponse> => {
  try {
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${BaseConfig.GOOGLE_API_KEY}`;
    const response = await axios.get(endpoint, {
      headers: {Accept: 'application/json'},
    });
    const data = response.data;

    if (data.status === 'OK') {
      const route = data.routes[0];
      const leg = route.legs[0];
      const encodedPolyline = route.overview_polyline.points;
      const decodedCoords = polyline
        .decode(encodedPolyline)
        .map(([lat, lng]) => ({latitude: lat, longitude: lng}));

      return {
        distance: leg.distance,
        duration: leg.duration, // e.g., { text: "12 mins", value: 720 } <- IN SECONDS
        polyline: decodedCoords,
      };
    } else {
      throw new Error('No result(s)');
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error getting route:', axiosError.message);
    throw new Error(axiosError.message);
  }
};
