const apiKey = 'hsiujvClbrbY2Ru7cvDOOXTiNCmyXB-_3yfa18UOL4BcdPUARQ3kQJUw3Iox5c-e0t1xD4yN7ly2Yza9YNNFJrpKSBOUHZhax_hygeSjJD0rmsnUXOJY4C9trmCfXnYx';

const Yelp = {
  search(term, location, sortBy) {
    const headers = {
      headers: { Authorization: `Bearer ${apiKey}`}
    };
    const path = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    return fetch(path, headers)
            .then(response => response.json())
            .then(jsonResponse => {
              if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                  return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    website: business.url
                  };
                })
              }
            })
  }
};

export default Yelp;
