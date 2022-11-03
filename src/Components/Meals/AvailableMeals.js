import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const fetchmeals = useCallback(async () => {

        const res = await fetch("https://foodorderapp-f97de-default-rtdb.firebaseio.com/meals.json")

        if (!res.ok) {
            throw new Error("Something went wrong")
        }

        const data = await res.json()
        // console.log(data)

        let loadedMeals = []
        for (let key in data) {
            loadedMeals.push({ id: key, ...data[key] })
        }

        // console.log(meals)
        setMeals(loadedMeals)

    }, [])

    useEffect(() => {
        // const fetchmeals = async () => {

        //     const res = await fetch("https://foodorderapp-f97de-default-rtdb.firebaseio.com/meals.json")

        //     if (!res.ok) {
        //         throw new Error("Something went wrong")
        //     }

        //     const data = await res.json()
        //     // console.log(data)

        //     let loadedMeals = []
        //     for (let key in data) {
        //         loadedMeals.push({ id: key, ...data[key] })
        //     }

        //     // console.log(meals)
        //     setMeals(loadedMeals)

        // }
        fetchmeals().catch(err => {
            setIsLoading(false)
            setError(err.message)

        })

        setIsLoading(false)

        console.log(1)

    }, [fetchmeals])



    const mealsList = meals.map((meal) => <MealItem key={nanoid()} name={meal.name} price={meal.price} decription={meal.description} id={meal.id} />)

    // console.log(mealsList)

    if (isLoading) {
        return (
            <section className={classes.MealsIsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className={classes.MealsIsLoading}>
                <p>{error}</p>
            </section>
        )
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals