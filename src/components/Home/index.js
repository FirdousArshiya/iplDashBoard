// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isSpinnerLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    this.setState({
      teamsData: data.teams.map(eachTeam => ({
        name: eachTeam.name,
        id: eachTeam.id,
        teamImageURL: eachTeam.team_image_url,
      })),
      isSpinnerLoading: false,
    })
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isSpinnerLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isSpinnerLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}
export default Home
