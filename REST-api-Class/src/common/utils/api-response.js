class ApiResponse {
  static ok(res, message, data = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, messege, data = null) {
    return res.status(201).json({
      success: true,
      messege,
      data,
    });
  }

  static noContent(res) {
    return res.status(204).json({
      success: true,
      message: "No content",
    });
  }
}
