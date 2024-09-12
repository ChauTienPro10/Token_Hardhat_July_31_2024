import { Client } from "@elastic/elasticsearch";

// Kết nối tới Elasticsearch
const client = new Client({ node: 'http://localhost:9200' });

// Hàm tìm kiếm tài liệu dựa trên truy vấn
async function searchDocuments(index, query) {
  try {
    const result = await client.search({
      index: index, // Tên index mà bạn muốn tìm kiếm
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['name', 'major'] // Tìm kiếm trên cả 'name' và 'major'
          }
        }
        }
    });

    // Kiểm tra kỹ các thuộc tính trước khi truy cập
    if (result && result.hits && result.hits.hits) {
      const hits = result.hits.hits;

      if (hits.length > 0) {
        // Lấy thông tin từ hits
        hits.forEach(hit => {
          const source = hit._source;
          console.log(`Name: ${source.name}`);
          console.log(`Major: ${source.major}`);
          console.log(`Level: ${source.level}`);
          console.log('------------------------');
        });
      } else {
        console.log('No documents found.');
      }
    } else {
      console.log('No hits or invalid result structure.');
    }
  } catch (error) {
    console.error('Error searching documents:', error);
  }
}

// Gọi hàm tìm kiếm với từ khóa
searchDocuments('teacher', 'Chau Duong Phat Tien');
