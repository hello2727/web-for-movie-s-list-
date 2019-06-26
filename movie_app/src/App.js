import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';

const movieTitles = [
  "Matrix",
  "Full Metal Jacket",
  "Oldboy",
  "Star Wars"
]

const movieImages=[
  "https://upload.wikimedia.org/wikipedia/sco/c/c1/The_Matrix_Poster.jpg",
  "http://noiseyboy.co.uk/wp-content/uploads/2016/11/full-metal-jacket-1.jpg",
  "http://i.huffpost.com/gen/1230907/original.jpg",
  "https://natedsanders.com/ItemImages/000046/46877b_lg.jpeg"
]

class App extends Component {
  //Render: componentWillMount() -> render() -> componentDidMount() //컴포넌트 존재할때 시작
  //Update: componentWillReceiveProps() -> shouldComponentUpdate() == true -> componentWillUpdate() -> render() -> componentDidUpdate()

  state={}

  componentDidMount(){ //사이즈가 작아야 좋은 것.
    this._getMovies();
  }

  _renderMovies = () => { //나의 기능은 _로 시작하기
    const movies = this.state.movies.map(movie => { //movie변수에 데이터 저장
      console.log(movie)
      return <Movie
       title={movie.title_english}
       poster={movie.medium_cover_image}
       key={movie.id}
       genres={movie.genres}
       synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => { //비동기 함수
    const movies = await this._callApi() //await: call api기능 끝나는 것을 기다리는 것. 그리고 movies변수에 삽입.
    this.setState({ //return괸 movies 실행.
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json()) //다음단계. json으로 변환
    .then(json => json.data.movies)
    .catch(err => console.log(err)) //fetch에서 에러나면 잡아서 나에게 보여줘
  }

  render() { //모든 컴포넌트는 render함수를 가짐.
    const {movies} = this.state;
    return (
      <div className={movies ? "App": "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
