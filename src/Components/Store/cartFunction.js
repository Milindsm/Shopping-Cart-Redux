import {uiActions} from "./uiSlice";
import {cartActions} from "./cartSlice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchdata = async () => {
            const response = await fetch(
                "https://cartredux-ff773-default-rtdb.firebaseio.com/cart.json"
            );

            if (!response.ok) {
                throw new Error("Could not fetch cart data");
            }
            const data = await response.json();
            return data;
        };
        try {
            const cartData = await fetchdata();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "fetching cart data failed",
                })
            );
        }
    };
};
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending",
                message: "Sending data....",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://cartredux-ff773-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Sending cart data failed..");
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "Success",
                    title: "Success",
                    message: "Cart data sent successfuly",
                })
            );
        } catch (error) {
            sendCartData().catch((err) => {
                dispatch(
                    uiActions.showNotification({
                        status: "Error",
                        title: "Error!",
                        message: "Error in sending data",
                    })
                );
            });
        }
    };
};