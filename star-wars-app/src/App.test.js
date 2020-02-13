import React from "react"
import * as rtl from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "./App"
import axios from "axios"


jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: [{
                    name:"Luke Skywalker",
                    height: "172",
                    mass: "77"
            }]
            }
        }))
    }
})


test("Render the Logo", async () => {
    const wrapper = rtl.render(<App />);
    await wrapper.findAllByAltText(/logo/i);
    expect(wrapper.findByAltText(/logo/i)).not.toBeNull();
})

test("Render the next button", async () => {
    const wrapper = rtl.render(<App />);
    wrapper.getByText(/next/i);
    const nextElem = wrapper.getByText(/next/i);
    rtl.act(() => {
        rtl.fireEvent.click(nextElem)
    })
    expect(wrapper.getByText(/next/i)).not.toBeNull();
})

test("Render the previous button", async () => {
    const wrapper = rtl.render(<App />);
    wrapper.getByText(/previous/i);
    const prevElem = wrapper.getByText(/previous/i);
    rtl.act(() => {
        rtl.fireEvent.click(prevElem)
    })
    expect(wrapper.getByText(/previous/i)).toBeNull();
})

