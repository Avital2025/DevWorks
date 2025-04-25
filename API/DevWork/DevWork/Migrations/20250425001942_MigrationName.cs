using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevWork.Migrations
{
    /// <inheritdoc />
    public partial class MigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployerEmail",
                table: "filesList",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "EmployerEmail",
                table: "extractedDataList",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployerEmail",
                table: "filesList");

            migrationBuilder.DropColumn(
                name: "EmployerEmail",
                table: "extractedDataList");
        }
    }
}
