import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute } from "./pages";
import { useAppContext } from "./context/appContext";
import {
  AddThesis,
  AllTheses,
  MyThesis,
  Profile,
  SharedLayout,
  MyTheses,
  Chat,
} from "./pages/dashboard";

function App() {
  const { role } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllTheses />} />
          <Route path="all-theses" element={<AllTheses />} />
          {role !== "student" && (
            <Route path="add-thesis/*" element={<AddThesis />} />
          )}

          {role === "student" && (
            <Route path="my-thesis/*" element={<MyThesis />} />
          )}

          {(role === "professor" || role === "head-professor") && (
            <Route path="my-theses/*" element={<MyTheses />} />
          )}

          <Route path="profile/*" element={<Profile />} />
          <Route path="chat/*" element={<Chat />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
