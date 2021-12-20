import './styles/style.scss'
import { HeaderComponent } from './components/headerComponent'
import { FooterComponent } from './components/footerComponent'
import { MainPage } from './components/pages/mainPage'
import { DecorationPage } from './components/pages/decorationPage'
import { SettingsPage } from './components/pages/settingsPage'
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import { data } from './data'
import { IFilter } from './data'
import React from 'react'


export let filters: IFilter = {
  sizes: [],
  colors: [],
  shapes: [],
  favorites: false
};

let currentData = []

export const App: React.FC = () => {
  
  let [cards, setCards] = React.useState(data)
  function addFilters(elem, type) {
    
    switch (type) {
      case 'color':
        if (filters.colors.includes(elem)) {
          filters.colors = filters.colors.filter(item => item!== elem)
        } else {
          filters.colors.push(elem)
        }
        break;
      case 'size':
        if (filters.sizes.includes(elem)) {
          filters.sizes = filters.sizes.filter(item => item!== elem)
        } else {
          filters.sizes.push(elem)
        }
        break;
      
      case 'shape':
        if (filters.shapes.includes(elem)) {
          filters.shapes = filters.shapes.filter(item => item!== elem)
        } else {
          filters.shapes.push(elem)
        }
        break;
        
      default:
        filters.favorites = !filters.favorites

        break;
    }
    updateCards()
  
  }
  function updateCards() {
      let newData = []
      if (filters.colors.length == 0 && filters.sizes.length == 0 && filters.shapes.length == 0 && filters.favorites == false) {
        setCards(data)
        currentData = data
        return
      }
      data.forEach(item=> {
        if(  (filters.colors.length == 0 || filters.colors.includes(item.color)) && ( filters.shapes.length == 0 || filters.shapes.includes(item.shape)) && (  filters.sizes.length == 0 || filters.sizes.includes(item.size))) {
          if (filters.favorites && item.favorite) {
            newData.push(item)
          } else if (!filters.favorites) {
            newData.push(item)
          }
          
        }
      })
      currentData = newData
      setCards(newData)
  }
  function useAmountFilter(amountArr) {
    console.log(amountArr)
  }
  return (
    <>
      <HashRouter>
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/settings" element={<SettingsPage cards={cards} onToggle={addFilters} setAmountCards={useAmountFilter}/>} />
          <Route path="/decoration" element={<DecorationPage />} />
        </Routes>
        <FooterComponent />
      </HashRouter>
    </>
  )
}
