// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {isSpinnerLoading: true, teamMatchesData: {}}

  componentDidMount() {
    this.getTeamMatches()
  }

  getLatestMatchFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getLatestMatchFormattedData(
        fetchedData.latest_match_details,
      ),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getLatestMatchFormattedData(eachMatch),
      ),
    }
    this.setState({teamMatchesData: formattedData, isSpinnerLoading: false})
  }

  renderRecentMatchCardList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachRecentMatch => (
          <MatchCard key={eachRecentMatch.id} matchDetails={eachRecentMatch} />
        ))}
      </ul>
    )
  }

  renderLatestTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchCardList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'Sh':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isSpinnerLoading} = this.state
    const routeClassName = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={routeClassName}>
        {isSpinnerLoading
          ? this.renderLoader()
          : this.renderLatestTeamMatches()}
      </div>
    )
  }
}
export default TeamMatches
