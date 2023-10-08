import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );

        const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
        const secondOptionInputElement = component.getByTestId("secondOption");
        const submitButtonElement = component.getByTestId("submit-poll");

        expect(firstOptionLabelElement.textContent).toBe("First Option");
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, {target: {value: 'option 1'}});
        fireEvent.change(secondOptionInputElement, {target: {value: 'option 2'}});
        expect(firstOptionInputElement.value).toBe("option 1");
        expect(secondOptionInputElement.value).toBe("option 2");
    });
});
