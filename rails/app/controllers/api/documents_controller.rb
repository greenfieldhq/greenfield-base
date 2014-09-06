class Api::DocumentsController < ApplicationController
  before_action :set_document, only: [:show, :update, :destroy]

  # GET /documents
  def index
    render json: Document.all
  end

  # GET /documents/1
  def show
    render json: @document
  end

  # POST /documents
  def create
    document = Document.new(document_params)
    document.user = current_user
    byebug
    document.save!

    if document.new_record?
      render json: { errors: document.errors.messages }, status: 422
    else
      render json: document, status: 201
    end
  end

  # PATCH/PUT /documents/1
  def update
    if @document.update(document_params)
      render json: @document, status: 201
    else
      render json: { errors: @document.errors.messages }, status: 422
    end
  end

  # DELETE /documents/1
  def destroy
    @document.destroy
    render json: @document, status: 201
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def document_params
      params.require(:document).permit(:user_id, :body, :title)
    end
end
