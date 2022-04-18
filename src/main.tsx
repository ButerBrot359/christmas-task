import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from 'react-router-dom'
import { HeaderComponent } from './components/staticPages/headerComponent'
import { FooterComponent } from './components/staticPages/footerComponent'
import { MainPage } from './components/pages/mainPage'
import { DecorationPage } from './components/pages/decorationPage'
import { SettingsPage } from './components/pages/settingsPage'
import { data, IBallType, IShpClrSz } from './data'
import { IFilter } from './data'

export let filters: IFilter = {
  sizes: [],
  colors: [],
  shapes: [],
  favorites: false,
  amount: ['1', '12'],
  year: ['1920', '2020'],
  sort: 'sort-name-max',
  search: '',
}

let SelectedCount: number = 0

export let SelectedItems: IBallType[] = []

export const updateData: IBallType[] = data.map((el) => {
  return { ...el, ...{ select: false } }
})

export const MainComponent: React.FC = () => {
  let stateShapes: IShpClrSz = {
    ball: false,
    bell: false,
    cone: false,
    snowflake: false,
    toy: false,
  }
  let stateColors: IShpClrSz = {
    red: false,
    green: false,
    yellow: false,
    white: false,
    blue: false,
  }
  let stateSize: IShpClrSz = {
    big: false,
    middle: false,
    small: false,
  }
  let [currentState, setCurrentState] = React.useState(stateShapes)
  let [currentColorState, setCurrentColorState] = React.useState(stateColors)
  let [currentSizeState, setCurrentSizeState] = React.useState(stateSize)
  let [year, setYear] = React.useState(filters.year)
  let [amount, setAmount] = React.useState(filters.amount)
  let [cards, setCards] = React.useState(updateData)
  let [defaultFavFilter, setDefaultFavFilter] = React.useState(false)
  let [amountOfSelected, setSelectedNum] = React.useState(SelectedCount)

  let [searchField, setSearchField] = React.useState('')

  function updateRange(arr: string[], type: string) {
    type == 'year'
      ? (filters.year = arr.map((el: string) => el.split('.')[0]))
      : (filters.amount = arr.map((el: string) => el.split('.')[0]))
    setYear(filters.year)
    setAmount(filters.amount)
    updateCards()
  }
  function addFilters(elem: string, type: string) {
    switch (type) {
      case 'color':
        if (filters.colors.includes(elem)) {
          filters.colors = filters.colors.filter(
            (item: string) => item !== elem
          )
        } else {
          filters.colors.push(elem)
        }
        break
      case 'size':
        if (filters.sizes.includes(elem)) {
          filters.sizes = filters.sizes.filter((item: string) => item !== elem)
        } else {
          filters.sizes.push(elem)
        }
        break

      case 'shape':
        if (filters.shapes.includes(elem)) {
          filters.shapes = filters.shapes.filter(
            (item: string) => item !== elem
          )
        } else {
          filters.shapes.push(elem)
        }
        break

      default:
        filters.favorites = !filters.favorites

        break
    }
    updateCards()
  }
  function updateSelected(id: string) {
    setCards(
      updateData.map((item: IBallType) => {
        if (item.num === id) {
          if (item.select) {
            item.select = !item.select
          } else {
            if (SelectedCount < 20) {
              item.select = !item.select
            } else {
              alert('Превышен лимит избранных игрушек!')
            }
          }
        }
        return item
      })
    )
    SelectedItems = updateData.filter((el: IBallType) => el.select)
    SelectedCount = SelectedItems.length
    setSelectedNum(SelectedCount)
    updateCards()
  }
  function updateSortFilter(param: string | undefined) {
    filters.sort = param
    updateCards()
  }
  function updateCards() {
    let newData: IBallType[] = []
    if (
      filters.colors.length == 0 &&
      filters.sizes.length == 0 &&
      filters.shapes.length == 0 &&
      filters.favorites == false
    ) {
      newData = updateData.filter(
        (el) =>
          Number(el.year) >= Number(filters.year[0]) &&
          Number(el.year) <= Number(filters.year[1]) &&
          Number(el.count) >= Number(filters.amount[0]) &&
          Number(el.count) <= Number(filters.amount[1]) &&
          el.name.toLocaleLowerCase().includes(filters.search)
      )

      setCards(sortData(newData))
      if (newData.length == 0) {
        alert('Извините, совпадений не обнаружено')
      }
    } else {
      updateData.forEach((item: IBallType) => {
        if (
          (filters.colors.length == 0 || filters.colors.includes(item.color)) &&
          (filters.shapes.length == 0 || filters.shapes.includes(item.shape)) &&
          (filters.sizes.length == 0 || filters.sizes.includes(item.size)) &&
          Number(item.year) >= Number(filters.year[0]) &&
          Number(item.year) <= Number(filters.year[1]) &&
          Number(item.count) >= Number(filters.amount[0]) &&
          Number(item.count) <= Number(filters.amount[1]) &&
          item.name.toLocaleLowerCase().includes(filters.search)
        ) {
          if (filters.favorites && item.favorite) {
            newData.push(item)
          } else if (!filters.favorites) {
            newData.push(item)
          }
        }
      })

      setCards(sortData(newData))
      if (newData.length == 0) {
        alert('Извините, совпадений не обнаружено')
      }
    }
  }
  function updateSearch(text: string) {
    filters.search = text.toLowerCase()
    setSearchField(text)
    updateCards()
  }
  function sortData(arr: IBallType[]) {
    if (filters.sort == 'sort-name-max') {
      return arr.sort((a: IBallType, b: IBallType) =>
        a.name > b.name ? 1 : -1
      )
    } else if (filters.sort == 'sort-name-min') {
      return arr.sort((a: IBallType, b: IBallType) =>
        a.name > b.name ? -1 : 1
      )
    } else if (filters.sort == 'sort-count-max') {
      return arr.sort((a: IBallType, b: IBallType) =>
        Number(a.count) > Number(b.count) ? 1 : -1
      )
    } else {
      return arr.sort((a: IBallType, b: IBallType) =>
        Number(a.count) > Number(b.count) ? -1 : 1
      )
    }
  }
  function removeFilters() {
    filters = {
      sizes: [],
      colors: [],
      shapes: [],
      favorites: false,
      amount: ['1', '12'],
      year: ['1920', '2020'],
      sort: filters.sort,
      search: '',
    }
    setSearchField(filters.search)
    setYear(filters.year)
    updateCards()
  }
  return (
    <>
      <HashRouter>
        <HeaderComponent
          amountOfSelected={amountOfSelected}
          updateSearch={updateSearch}
          searchField={searchField}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                cards={cards}
                onToggle={addFilters}
                changeFilterForRange={updateRange}
                changeSelected={updateSelected}
                sortData={updateSortFilter}
                defaultFavFilter={defaultFavFilter}
                setDefaultFavFilter={setDefaultFavFilter}
                removeFilters={removeFilters}
                setCurrentState={setCurrentState}
                currentState={currentState}
                currentColorState={currentColorState}
                setCurrentColorState={setCurrentColorState}
                year={year}
                setYear={setYear}
                amount={amount}
                setAmount={setAmount}
                currentSizeState={currentSizeState}
                setCurrentSizeState={setCurrentSizeState}
              />
            }
          />
          <Route path="/decoration" element={<DecorationPage />} />
        </Routes>
        <FooterComponent />
      </HashRouter>
    </>
  )
}
