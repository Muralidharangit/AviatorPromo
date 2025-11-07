// get the Bank details

import axios from "axios";
import axiosInstance from "./axiosConfig";
import BASE_URL from "./api";

// Get Bank Data
export const getBankDetails = async (token) => {
  //   console.log("checking the with Bank Details", token);
  const response = await axiosInstance.get("/player/get-bank", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// store Bank Data
export const storeBank = async (token, values) => {
  const response = await axios.post(`${BASE_URL}/player/store-bank`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Edit Bank Details
export const EditBank = async (bankId, token) => {
  // console.log(bankId);

  const response = await axiosInstance.get(`/player/edit-bank/${bankId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
// update-bank
export const updateBank = async (token, values, editingBankId) => {
  const response = await axios.post(
    `${BASE_URL}/player/update-bank/${editingBankId}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// active in-active status changing
export const changeBankStatus = async (token, bank_id, newStatus) => {
  const response = await axiosInstance.get("/player/change-bank-status", {
    params: { bank_id, status: newStatus },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// delete Bank Details
export const deleteBankDetails = async (token, bankId) => {
  const response = await axiosInstance.get("/player/delete-bank", {
    params: { bank_id: bankId, is_deleted: "0" },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// send-withdraw-request
export const sendWithdrawRequest = async ({ token, bankId, amount }) => {
  const formData = new FormData();
  formData.append("player_bank_id", bankId);
  formData.append("amount", amount);

  const response = await axios.post(
    `${BASE_URL}/player/send-withdraw-request`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// withdraw History
export const withdrawHistoryPage = async (token) => {
  const response = await axiosInstance.get("/player/withdraw-history", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ====================================================================
// Get Bank Data namibia
export const getBankDetailsNamibia = async (token, userId) => {
  console.log(userId);

  const response = await axiosInstance.get(
    "/player/withdraw-namibia/manual-withdraw/get-player-banks",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { player_id: userId }, // <-- goes here
    }
  );
  return response.data;
};
// ====================================================================

// store Bank Data Namibia
export const storeBankNamibia = async (token, values, userId) => {
  const response = await axios.post(
    `${BASE_URL}/player/withdraw-namibia/manual-withdraw/store-player-bank`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: { player_id: userId },
    }
  );
  return response.data;
};

// active in-active status changing
export const changeBankNamibiaStatus = async (token, bank_id, newStatus) => {
  const formData = new FormData();
  formData.append("bank_id", bank_id);
  formData.append("status", newStatus);
  console.log(formData);

  const response = await axiosInstance.post(
    "/player/withdraw-namibia/manual-withdraw/change-player-bank-status",
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
// Edit Bank Details
export const EditBankNamibia = async (bankId, token) => {
  // console.log("bankId:", bankId);

  const url = `player/withdraw-namibia/manual-withdraw/edit-player-bank/${bankId}`;

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params: { bank_id: bankId }, // 👈 query string ?bank_id=123
  });

  return response.data;
};
// update-bank
export const updateBankNamibia = async (token, values, editingBankId) => {
  console.log(values);

  const response = await axios.post(
    `${BASE_URL}/player/withdraw-namibia/manual-withdraw/update-player-bank/${editingBankId}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { bank_id: editingBankId },
    }
  );
  return response.data;
};
// delete Bank Details
export const deleteBankNamibiaDetails = async (token, bankId) => {
  const formData = new FormData();
  formData.append("bank_id", bankId);
  formData.append("is_deleted", "0");
  const response = await axiosInstance.post(
    "/player/withdraw-namibia/manual-withdraw/delete-player-bank",
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// send-withdraw-request Namibia
export const sendWithdrawRequestNamibia = async ({
  token,
  bankId,
  amount,
  userid,
}) => {
  const formData = new FormData();
  formData.append("player_bank_id", bankId);
  formData.append("amount", amount);
  formData.append("player_id", userid);

  const response = await axios.post(
    `${BASE_URL}/player/withdraw-namibia/manual-withdraw/send-withdraw-request`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// withdraw History Namibia
export const withdrawHistoryPageNamibia = async (token) => {
  const response = await axiosInstance.get(
    "/player/withdraw-namibia/manual-withdraw/history",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
//=========================================
// Get Bank Data India Manual
export const getBankDetailsIndia = async (token, userId) => {
  console.log(userId);

  const response = await axiosInstance.get(
    "/player/withdraw-india/manual-withdraw/get-player-bank",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { player_id: userId }, // <-- goes here
    }
  );
  return response.data;
};

// store Bank Data storeBankIndia
export const storeBankIndia = async (token, values, userId) => {
  const response = await axios.post(
    `${BASE_URL}/player/withdraw-india/manual-withdraw/store-player-bank`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      // params: { player_id: userId },
    }
  );
  return response.data;
};

// send-withdraw-request India
export const sendWithdrawRequestIndia = async ({
  token,
  bankId,
  amount,
  // userid,
}) => {
  const formData = new FormData();
  formData.append("player_bank_id", bankId);
  formData.append("amount", amount);
  // formData.append("player_id", userid);

  const response = await axios.post(
    `${BASE_URL}/player/withdraw-india/manual-withdraw/send-withdraw-request`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
