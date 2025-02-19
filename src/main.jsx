import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Routes/Root/Root";
import HomeLayout from "./Routes/PublicRoute/HomeLayout/HomeLayout";
import PetListingLayout from "./Routes/PublicRoute/PetListingLayout/PetListingLayout";
import DonationCampaignLayout from "./Routes/PublicRoute/DonationCampaignLayout/DonationCampaignLayout";
import About from "./Routes/PublicRoute/About/About";
import Login from "./Routes/PublicRoute/Login&Register/Login";
import Register from "./Routes/PublicRoute/Login&Register/Register";
import ErrorPage from "./Routes/PublicRoute/ErrorPage/ErrorPage";
import AuthContextProvider from "./AuthContextProvider/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PetDetailLayout from "./Routes/PublicRoute/PetDetailsLayout/PetDetailLayout";
import DashboardLayout from "./Routes/PrivateRoute/DashboardLayout/DashboardLayout";
import SecureRoute from "./Routes/SecureRoute/SecureRoute";
import MyProfile from "./Routes/PrivateRoute/MyProfile/MyProfile";
import Users from "./Routes/PrivateRoute/Users/Users";
import AllPets from "./Routes/PrivateRoute/AllPets/AllPets";
import AddAPet from "./Routes/PrivateRoute/AddAPet/AddAPet";
import MyAddedPets from "./Routes/PrivateRoute/MyAddedPets/MyAddedPets";
import AdoptionRequests from "./Routes/PrivateRoute/AdoptionRequests/AdoptionRequests";
import CreateCampaign from "./Routes/PrivateRoute/CreateCampaign/CreateCampaign";
import MyCampaigns from "./Routes/PrivateRoute/MyCampaigns/MyCampaigns";
import MyDonation from "./Routes/PrivateRoute/MyDonation/MyDonation";
import UnauthorizedPage from "./Pages/UnauthorizedPage/UnauthorizedPage";
import RedirectByRole from "./Routes/SecureRoute/RedirectByRole";
import DonationDetails from "./Routes/PublicRoute/DonationDetails/DonationDetails";
import AllCampaign from "./Routes/PrivateRoute/AllDonation/AllCampaign";
import { SkeletonTheme } from "react-loading-skeleton";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivaryPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        loader: () => {
          document.title = "Home | PETPROMISE";
          return;
        },
      },
      {
        path: "/pet-listing",
        element: <PetListingLayout />,
        loader: () => {
          document.title = "Pet Listing | PETPROMISE";
          return;
        },
      },
      {
        path: "/donation-campaigns",
        element: <DonationCampaignLayout />,
        loader: () => {
          document.title = "Donation Campaigns | PETPROMISE";
          return;
        },
      },
      {
        path: "/about",
        element: <About />,
        loader: () => {
          document.title = "About Us | PETPROMISE";
          return;
        },
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
        loader: () => {
          document.title = "Privacy Policy | PETPROMISE";
          return;
        },
      },
      {
        path: "/pet-details/:id",
        element: <PetDetailLayout />,
        loader: () => {
          document.title = "Pet Details | PETPROMISE";
          return;
        },
      },
      {
        path: "/donation-details/:id",
        element: <DonationDetails />,
        loader: () => {
          document.title = "Donation Details | PETPROMISE";
          return;
        },
      },
      {
        path: "/dashboard",
        element: (
          <SecureRoute>
            <DashboardLayout />
          </SecureRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <SecureRoute>
                <MyProfile />
              </SecureRoute>
            ),
            loader: () => {
              document.title = " My Profile - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/users",
            element: (
              <RedirectByRole>
                <SecureRoute>
                  <Users />
                </SecureRoute>
              </RedirectByRole>
            ),
            loader: () => {
              document.title = "Users - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/all-pets",
            element: (
              <RedirectByRole>
                <SecureRoute>
                  <AllPets />
                </SecureRoute>
              </RedirectByRole>
            ),
            loader: () => {
              document.title = "All Pets - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/all-donation",
            element: (
              <RedirectByRole>
                <SecureRoute>
                  <AllCampaign />
                </SecureRoute>
              </RedirectByRole>
            ),
            loader: () => {
              document.title = "All Campaigns - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/add-a-pet",
            element: (
              <SecureRoute>
                <AddAPet />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Add a Pet - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/my-added-pets",
            element: (
              <SecureRoute>
                <MyAddedPets />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "My Added Pets - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/adoption-request",
            element: (
              <SecureRoute>
                <AdoptionRequests />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Adoption Requests - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/create-donation-campaign",
            element: (
              <SecureRoute>
                <CreateCampaign />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Create Campaigns - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/my-donation-campaigns",
            element: (
              <SecureRoute>
                <MyCampaigns />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "My Campaigns - Dashboard | PETPROMISE";
              return;
            },
          },
          {
            path: "/dashboard/my-donation",
            element: (
              <SecureRoute>
                <MyDonation />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "My Donations - Dashboard | PETPROMISE";
              return;
            },
          },
        ],
      },
    ],
  },

  {
    path: "/unauthorized-access",
    element: <UnauthorizedPage />,
    loader: () => {
      document.title = "Unauthorized";
      return;
    },
  },

  {
    path: "/login",
    element: <Login />,
    loader: () => {
      document.title = "Login | PETPROMISE";
      return;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      document.title = "Register | PETPROMISE";
      return;
    },
  },
]);

// query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SkeletonTheme>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </SkeletonTheme>
  </StrictMode>
);
