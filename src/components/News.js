import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  articles = [
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
    {
      source: { id: "fox-news", name: "Fox News" },
      author: "Andrew Miller",
      title:
        "Report on Clarence Thomas' travel habits is 'politics plain and simple': expert",
      description:
        'Calls for the resignation of Justice Clarence Thomas are unfounded, an expert told Fox News Digital, and there is no "there there" when it comes to a report on his travels.',
      url: "https://www.foxnews.com/politics/report-clarence-thomas-travel-habits-politics-plain-simple-expert",
      urlToImage:
        "https://static.foxnews.com/foxnews.com/content/uploads/2022/11/Supreme-court-Justice-Thomas.jpg",
      publishedAt: "2023-04-09T14:07:27Z",
      content:
        'A report released last week accusing Supreme Court Justice Clarence Thomas of improperly receiving lavish gifts from a wealthy friend is nothing more than a political hit job, one expert claimed.\r\n"T… [+7385 chars]',
    },
    {
      source: { id: "independent", name: "Independent" },
      author: "Annabel Nugent",
      title:
        "Rowan Hisayo Buchanan: ‘Race is incredibly important – but sometimes I’m thinking about love or toast’",
      description:
        "The award-winning author of  ‘Harmless Like You’ returns with a lyrical, haunting third novel. She speaks to Annabel Nugent about writing her real life into fiction, letting go of the ‘default white guys’ that she used to write – and the messy politics of bei…",
      url: "http://www.independent.co.uk/arts-entertainment/books/features/rowan-hisayo-buchanan-interview-b2313310.html",
      urlToImage:
        "https://static.independent.co.uk/2023/04/03/17/Rowan%20Hisayo%20Buchanan%20%28c%29%20Sophie%20Davidson.jpg?quality=75&width=1200&auto=webp",
      publishedAt: "2023-04-09T07:05:33Z",
      content:
        "Sign up to our free IndyArts newsletter for all the latest entertainment news and reviews\r\nSign up to our free IndyArts newsletter\r\nRowan Hisayo Buchanan is preoccupied with questions. They swirl aro… [+8752 chars]",
    },
  ];
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 2,
      totalResults:0,
    };
    document.title = `${this.capitalizeFirstletter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews(){
    this.setState({page:this.state.page+1});
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7339bd3c13164f688fd19477a5aa52ae&page=1&pageSize=${this.props.pageSize}`;
     this.setState({loading:true});
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({
       articles: parsedData.articles,
       totalResults: parsedData.totalResults,
       loading:false,})
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7339bd3c13164f688fd19477a5aa52ae&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextclick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=7339bd3c13164f688fd19477a5aa52ae&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  handlePrevclick = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=7339bd3c13164f688fd19477a5aa52ae&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
      totalResults:0,
    });
  };
    fetchMoreData = async  ()=> {
      console.log(this.state.page)
     this.setState({page:this.state.page+1});
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7339bd3c13164f688fd19477a5aa52ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true});
     let data = await fetch(url);
     let parsedData = await data.json();
     this.setState({
       articles: this.state.articles.concat(parsedData.articles)
       ,
       totalResults: parsedData.totalResults,
       loading:false,})
    
    };
  
  render() {
    return (
      <div className="container my-3" style={{ width: "1000px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          NewsMonkey- Top Headlines{" "}
          {this.capitalizeFirstletter(this.props.category)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row" style={{ marginTop: "15px" }}>
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    key={element.url}
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : "Nothing to display"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 85)
                        : "The description can be viewed by clicking on Read More"
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://c.ndtvimg.com/2022-05/41q8vodo_power-generic-reuters_625x300_25_May_22.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page === 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevclick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextclick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
